export const graphics = [
    {
        color: "#426AD0",
        title: 'VictoryLine',
        style:{data: { stroke: "#426AD0" }, parent: { border: "1px solid #ccc"}},
        animated: {duration: 2000,onLoad: { duration: 1000 }},
        data: [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 6.8 },
            { x: 6, y: 6.5 },
            { x: 7, y: 7 }
        ]
    },
    {
        color: "grey",
        title: 'VictoryPie',
        animated: {easing: "bounce"},
        data: [
            { x: "Cambridge", y: 30 },
            { x: "Tng", y: 70 }
          ]
    }
]

export const services = [
    {
        color: "#426AD0",
        backgroundColor: "#D3EFFF",
        title: "Pedidos",
    },
    {
        color: "grey",
        backgroundColor: "#FFE2CB",
        title: "Clientes",
    },
    {
        color: "grey",
        backgroundColor: "#D3EFFF",
        title: "Produtos",
    },
];