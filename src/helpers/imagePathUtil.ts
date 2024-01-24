export const getImagePath = (image: string) => {
  const isMobile = window.innerWidth <= 768;
  const mobileSuffix = "-s";
  const imageBaseName = image.split(".")[0];
  const imageExtension = image.split(".")[1];

  // Append '-s' for mobile images
  const imageName = isMobile
    ? `${imageBaseName}${mobileSuffix}.${imageExtension}`
    : image;

  return `./assets/images/${imageName}`;
};
