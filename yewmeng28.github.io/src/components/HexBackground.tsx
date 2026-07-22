import { Box } from "@mui/material";

const colors = [
  "#60A5FA",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#A855F7",
  "#06B6D4",
  "#22D3EE",
];

const hexes = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  size: 30 + Math.random() * 140,

  left: Math.random() * 100,
  top: Math.random() * 100,

  duration: 20 + Math.random() * 30,
  delay: Math.random() * 20,

  blur: 6 + Math.random() * 10,

  opacity: 0.04 + Math.random() * 0.08,

  color: colors[Math.floor(Math.random() * colors.length)],

  moveX: (Math.random() - 0.5) * 180,
  moveY: (Math.random() - 0.5) * 180,

  rotate: (Math.random() - 0.5) * 170,

  scale: 0.85 + Math.random() * 0.5,
}));

export default function HexBackground() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      {hexes.map((hex) => (
        <Box
          key={hex.id}
          sx={{
            position: "absolute",

            left: `${hex.left}%`,
            top: `${hex.top}%`,

            width: hex.size,
            height: hex.size,

            bgcolor: hex.color,

            opacity: hex.opacity,

            background: `
              radial-gradient(
                circle at 30% 25%,
                rgba(255,255,255,0.45),
                ${hex.color}80 35%,
                ${hex.color}20 100%
              )
            `,

            border: "1px solid rgba(255,255,255,0.12)",

            filter: `blur(${hex.blur}px)`,

            clipPath:
              "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",

            animation: `float-${hex.id} ${hex.duration}s ease-in-out infinite alternate`,
            animationDelay: `${hex.delay}s`,

            [`@keyframes float-${hex.id}`]: {
              "0%": {
                transform:
                  "translate(0px,0px) rotate(0deg) scale(1)",
              },

              "50%": {
                transform: `
                  translate(${hex.moveX / 2}px, ${hex.moveY / 2}px)
                  rotate(${hex.rotate / 2}deg)
                  scale(${hex.scale})
                `,
              },

              "100%": {
                transform: `
                  translate(${hex.moveX}px, ${hex.moveY}px)
                  rotate(${hex.rotate}deg)
                  scale(1)
                `,
              },
            },
          }}
        />
      ))}
    </Box>
  );
}