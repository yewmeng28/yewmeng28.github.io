import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

const MAX_MESSAGE_LENGTH = 1000;

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    subject: "",
    message: "Hello Yew Meng, I would like to discuss...",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Please enter a message.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange =
    (field: keyof typeof form) =>
      (
        event: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement
        >
      ) => {
        const value = event.target.value;

        setForm((prev) => ({
          ...prev,
          [field]: value,
        }));

        if (errors[field]) {
          setErrors((prev) => ({
            ...prev,
            [field]: "",
          }));
        }
      };

  const sendMessage = async () => {
    if (loading) return;

    if (!validate()) return;

    try {
      setLoading(true);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSuccess(true);

      setForm({
        name: "",
        company: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      console.error(error);
      setFailure(true);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.message.trim() !== "" &&
    !loading;

  return (
    <>
      <Box
        sx={{
          maxWidth: 700,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          variant="h3"
        >
          Contact Me
        </Typography>

        <Typography color="text.secondary">
          Interested in working together or just want to say hello?
          I'd love to hear from you.
        </Typography>

        <TextField
          required
          label="Name"
          value={form.name}
          error={!!errors.name}
          helperText={errors.name}
          onChange={handleChange("name")}
        />

        <TextField
          label="Company (Optional)"
          value={form.company}
          onChange={handleChange("company")}
        />

        <TextField
          required
          type="email"
          label="Email"
          value={form.email}
          error={!!errors.email}
          helperText={errors.email}
          onChange={handleChange("email")}
        />

        <TextField
          label="Subject (Optional)"
          value={form.subject}
          onChange={handleChange("subject")}
        />

        <TextField
          required
          multiline
          minRows={6}
          label="Message"
          placeholder="Hi Yew Meng, I'd like to discuss an opportunity..."
          value={form.message}
          error={!!errors.message}
          helperText={
            errors.message ??
            `${form.message.length}/${MAX_MESSAGE_LENGTH}`
          }
          slotProps={{
            htmlInput: {
              maxLength: MAX_MESSAGE_LENGTH,
            },
          }}
          onChange={handleChange("message")}
        />

        <Button
          variant="contained"
          size="large"
          disabled={!canSubmit}
          onClick={sendMessage}
          sx={{
            alignSelf: "flex-start",
            minWidth: 180,
            bgcolor: "primary.dark",
          }}
        >
          {loading ? (
            <CircularProgress
              size={24}
              color="inherit"
            />
          ) : (
            "Send Email"
          )}
        </Button>
      </Box>

      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccess(false)}
        >
          Thank you! Your message has been sent successfully.
        </Alert>
      </Snackbar>

      <Snackbar
        open={failure}
        autoHideDuration={5000}
        onClose={() => setFailure(false)}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setFailure(false)}
        >
          Sorry, something went wrong. Please try again later.
        </Alert>
      </Snackbar>
    </>
  );
}