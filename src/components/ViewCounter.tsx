/* eslint-disable @next/next/no-img-element */
"use client";

interface Props {
  slug: string;
}

export default function ViewCounter({ slug }: Props) {
  const hitUrl = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fxeunnie.github.io%2Fprojects%2F${slug}&count_bg=%23E2E8F0&title_bg=%230f172a&icon=&icon_color=%23E7E7E7&title=views&edge_flat=true`;

  return (
    <img
      src={hitUrl}
      alt="view count"
      className="inline-block opacity-70 hover:opacity-100 transition-opacity"
      loading="lazy"
    />
  );
}
