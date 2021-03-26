export const TIME_RANGE = [
  {
    horario_desde: '00:00',
    horario_hasta: '06:00'
  },
  {
    horario_desde: '06:00',
    horario_hasta: '12:00'
  },
  {
    horario_desde: '12:00',
    horario_hasta: '18:00'
  },
  {
    horario_desde: '18:00',
    horario_hasta: '00:00'
  }
];

export const SET_TEMPLATES = [
  {
    title: 'Plantillas de 4 bloques',
    timeTile: '4 bloques',
    valueTime: 6,
    cssContainer: {
      size: [1, 2, 3, 4],
      width: '17%',
    },
    allValues: [],
    values: [],
  },
  {
    title: 'Plantillas de 3 bloques',
    timeTile: '3 bloques',
    valueTime: 8,
    cssContainer: {
      size: [1, 2, 3],
      width: '25%',
    },
    allValues: [],
    values: [],
  },
  {
    title: 'Plantillas de 2 bloques',
    timeTile: '2 bloques',
    valueTime: 12,
    cssContainer: {
      size: [1, 2],
      width: '40%',
    },
    allValues: [],
    values: [],
  },
  {
    title: 'Plantillas de 1 bloque',
    timeTile: '1 bloque',
    valueTime: 24,
    cssContainer: {
      size: [1],
      width: '100%',
    },
    allValues: [],
    values: [],
  }
];


export const COLORS_TEMPLATES = [
  {
    color: "Violet",
    array_color: ["#9168C5", "#D1BBEC", "#34135E", "#C0A3E6", "#553B76", "#DFD9E7", "#574D64", "#B6ABC4", "#372F42"]
  },
  {
    color: "Green",
    array_color: ["#17CD53", "#B2DCC0", "#044018", "#75E89B", "#088F35", "#95C7A6", "#2E6942", "#449F63", "#2A3C30"]
  },
  {
    color: "Blue",
    array_color: ["#1477FC", "#9FC6FB", "#04285A", "#76A9ED", "#1A5099", "#C1BDE5", "#3E5575", "#6883A8", "#242D39"]
  },
  {
    color: "Green-Light",
    array_color: ["#13ECBA", "#CAEBE4", "#0B5947", "#9BEEDB", "#019472", "#B8D1CB", "#3C5952", "#609F91", "#283C37"]
  },
  {
    color: "Orange",
    array_color: ["#FF9315", "#FFE3C1", "#693A03", "#FFCC91", "#BB6500", "#E3CAAC", "#836038", "#CE9046", "#4E381E"]
  },
  {
    color: "Pink",
    array_color: ["#FF5B83", "#FFD0DC", "#950024", "#FFA8BD", "#EA1E4F", "#E1C6CD", "#AC5B6F", "#BE9DA5", "#682D3B"]
  }
];

export const SELECT_OPTIONS_TIME = [
  {
    value: 'fourDays',
    name: '4 días'
  },
  {
    value: 'twoWeeks',
    name: '2 semanas'
  }
];

export const SELECT_OPTIONS_GROUP = [
  {
    value: 'all_groups',
    name: 'Todos los grupos'
  },
  {
    value: 'my_groups',
    name: 'Sólo mis grupos'
  },
  {
    value: 'support_organization',
    name: 'Sólo mi gerencia'
  }
];

