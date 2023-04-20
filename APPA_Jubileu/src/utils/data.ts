export const graphics = [
    {
        color: "#426AD0",
        title: 'VictoryLine',
        style:{data: { stroke: "#426AD0" }, parent: { border: "1px solid #ccc"}},
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
        data: [
            { x: "Cambridge", y: 30 },
            { x: "Tng", y: 70 }
          ]
    }
]

interface OptionSection {
    color: string;
    backgroundColor: string;
    title: string;
    action: string;
}

export const optSections: OptionSection[] = [
    {
        color: "#426AD0",
        backgroundColor: "#D3EFFF",
        title: "Pedidos" as const,
        action: 'navigation.navigate("orders")'
    },
    {
        color: "grey",
        backgroundColor: "#FFE2CB",
        title: "Clientes" as const,
        action: 'alert("teste")'
    },
    {
        color: "grey",
        backgroundColor: "#D3EFFF",
        title: "Produtos" as const,
        action: 'alert("teste")'
    },
];

export const popup = [
    {
        icon: 'clouduploado',
        title: 'Alterar foto',
        color: 'darkblue',
        action: 'alert("teste")'
    },
    {
        icon: 'profile',
        color: 'orange',
        title: 'Visualizar perfil',
        action: 'alert("teste")'
    },
    {
        icon: 'setting',
        color: 'grey',
        title: 'Personalizar tema',
        action: 'alert("teste")'
    },
    {
        icon: 'export2',
        color: 'tomato',
        title: 'Sair',
        action: 'navigation.navigate("login")'
    }
]

export const filterOrder = [null, 'Código', 'Razão Social', 'CNPJ']