// Adapted from the user-supplied Originkit component.
"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
const DEFAULT_IMAGES = [
  { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/e60dd7f7-a44f-40a7-df62-095b19cd8700/w=800" },
  { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/eec164e9-23f8-4f87-b48a-a208fa806100/w=800" },
  { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/859c75ea-953e-489e-be61-91a03a35d700/w=800" },
  { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/933a7615-f4b6-4eae-8ed1-705fa0e24400/w=800" },
  { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/7d4d2641-d6a8-4fef-e85c-b12ed100d500/w=800" },
  { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/ed7b1c40-3332-43d8-a9eb-4615ef341b00/w=800" },
  { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/31afae9c-5ba3-4ec3-2534-ed8198ed1100/w=800" },
  { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/bd541261-75be-469c-7dc0-dae0ce81c400/w=800" }
];
function RoundCarousel({
  images = DEFAULT_IMAGES,
  imageWidth = 300,
  imageHeight = 300,
  spacing = 3,
  speed = 7,
  direction = "right",
  drag = true,
  sensitivity = 5,
  tilt = -7,
  perspective = 3e3,
  cornerRadius = 22,
  innerDim = 3.5,
  background = "#000000",
  style = {}
}) {
  const items = images.length > 0 ? images : DEFAULT_IMAGES;
  const count = items.length;
  const ringRef = useRef(null);
  const rafRef = useRef(0);
  const rotYRef = useRef(0);
  const velRef = useRef(0);
  const lastRef = useRef(0);
  const dragRef = useRef({ active: false, x: 0 });
  const angle = 360 / count;
  const factor = 1 + spacing * 0.15;
  const radius = imageWidth * factor / (2 * Math.tan(Math.PI / count));
  const radiusPx = cornerRadius;
  const degPerSec = speed * 6 * (direction === "left" ? -1 : 1);
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const apply = () => ring.style.transform = `translateZ(${-radius}px) rotateY(${rotYRef.current}deg)`;
    apply();
    const draw = (now) => {
      const dt = lastRef.current ? (now - lastRef.current) / 1e3 : 0;
      lastRef.current = now;
      const f = Math.min(dt, 0.1);
      const d = dragRef.current;
      if (!d.active && speed !== 0) {
        if (Math.abs(velRef.current) > 0.01) {
          rotYRef.current += velRef.current * f;
          velRef.current *= 0.94;
        } else {
          rotYRef.current += degPerSec * f;
        }
      }
      apply();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius, degPerSec, count]);
  const onPointerDown = (e) => {
    if (!drag) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragRef.current = { active: true, x: e.clientX };
    velRef.current = 0;
  };
  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    d.x = e.clientX;
    const k = 0.3 * sensitivity;
    rotYRef.current += dx * k;
    velRef.current = dx * k * 60;
  };
  const onPointerUp = (e) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    dragRef.current.active = false;
  };
  const faceBase = {
    position: "absolute",
    inset: 0,
    borderRadius: radiusPx,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        ...style,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background,
        perspective: `${perspective}px`,
        cursor: drag ? "grab" : "default",
        touchAction: "pan-y"
      },
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt}deg)`
          },
          children: /* @__PURE__ */ jsx(
            "div",
            {
              ref: ringRef,
              style: {
                position: "relative",
                width: imageWidth,
                height: imageHeight,
                transformStyle: "preserve-3d"
              },
              children: items.map((img, i) => {
                const src = img?.src;
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    role: "img",
                    "aria-label": img.alt || `Project ${i + 1}`,
                    style: {
                      position: "absolute",
                      inset: 0,
                      transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                      transformStyle: "preserve-3d"
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          style: {
                            ...faceBase,
                            backgroundColor: src ? "transparent" : "#222",
                            backgroundImage: src ? `url("${src}")` : void 0,
                            boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          style: {
                            ...faceBase,
                            transform: "rotateY(180deg)",
                            backgroundColor: src ? "transparent" : "#181818",
                            backgroundImage: src ? `url("${src}")` : void 0,
                            filter: `brightness(${innerDim / 10})`
                          }
                        }
                      )
                    ]
                  },
                  i
                );
              })
            }
          )
        }
      )
    }
  );
}
export {
  RoundCarousel as default
};
