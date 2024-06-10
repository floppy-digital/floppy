const fontNames = [
  'AddCityboy',
  'Art Greco',
  'CapitalisTypOasis',
  'Argos George Contour',
  'Eat your heart out',
  'diel-Regular',
  'ExtraBlur',
  'Emilio 20',
  'El&Font Bubble',
  'KleinsThreePixel',
  'wassimo graffiti',
  'Fat Wandals PERSONAL USE',
  'Grid Fracture',
  'Gas Mask Warriors',
  'KleinsThreeFS',
  'Mionta',
  'Mainstream PERSONAL USE ONLY',
  'Movie Poster Personal Use',
  'Olde English',
  'Opiated BRK',
  'OptimusPrinceps',
  'RaseBasic',
  'Spire Alt',
  'row-Regular',
  'SANTOS DUMONT',
  'Neue Haas Grotesk Display Pro',
  'Sans Poster Bold JL',
  'Plasmatica Open',
  'Univox',
  'Spoken PERSONAL USE ONLY',
  'Zimbra',
  'SPEW',
  'Thorne Shaded',
];

const getFontName = (id) => {
  const index = id.split('-')[2];
  return fontNames[index];
};

export { fontNames, getFontName };
