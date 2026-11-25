export const brandColors: Record<string, string> = {
  Technogym: "#FFD100",
  Matrix: "#E31837",
  Panatta: "#E2001A",
  HammerStrength: "#C8102E",
};

export const defaultBrandColor = "#555555";

export const getBrandColor = (brand: string) =>
  brandColors[brand] ?? defaultBrandColor;