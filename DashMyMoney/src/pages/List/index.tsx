import React, { useMemo, useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
 
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import GetGains from '../../repositories/gains';

import { 
    Container, 
    Content, 
    Filters,
    Create
} from './styles';

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']);
    
    const movimentType = match.params.type;

    const [pageData, setPageData] = useState({title: '',lineColor: '', data: []}|| {})
    const [years,setYears] = useState([])

    function getYear(data: any){
    
        let uniqueYears: number[] = [];
            
        data.forEach((item: { date: string | number | Date; }) => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year)
           }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        });
    }

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });
    },[]);


    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

        if(alreadySelected >= 0){
            const filtered = frequencyFilterSelected.filter(item => item !== frequency);
            setFrequencyFilterSelected(filtered);
        }else{            
            setFrequencyFilterSelected((prev) => [...prev, frequency]); 
        }
    }

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }
        catch{
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }
        catch{
            throw new Error('invalid year value. Is accept integer numbers.')
        }
    }


    useEffect(() => {        
        async function formatData(){

            let auxPageData: any

            if(movimentType === 'entry-balance'){
                auxPageData = {
                    title: 'Entradas',
                    lineColor: '#4E41F0',
                    data: await GetGains()
                }
    
            }else { 
                auxPageData = {
                    title: 'Saídas',
                    lineColor: '#E44C4E',
                    data: expenses
                }
            }
            
            setPageData(auxPageData)
            const {data} = auxPageData

            let yearAux: any = getYear(data)
            setYears(yearAux)
            
            const filteredData = data.filter((item: { date: string | number | Date; frequency: string; }) => {
                const date = new Date(item.date);
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
    
                return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
            });
    
            const formattedData = filteredData.map((item: { description: any; amount: any; frequency: string; date: string; }) => {
                return {
                    id: uuid(),
                    description: item.description,
                    amountFormatted: formatCurrency(Number(item.amount)),
                    frequency: item.frequency,
                    dateFormatted: formatDate(item.date),
                    tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
                }
            });        
            setData(formattedData);
        }
    
        formatData()
    },[movimentType, monthSelected, yearSelected, data.length, frequencyFilterSelected]); 


    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput 
                    options={months}
                    onChange={(e) => handleMonthSelected(e.target.value)} 
                    defaultValue={monthSelected}
                />
                <SelectInput 
                    options={years} 
                    onChange={(e) => handleYearSelected(e.target.value)} 
                    defaultValue={yearSelected}
                />
            </ContentHeader>

            <div style={{justifyContent:'space-between', flexDirection:'row', display:'flex'}}>
                <Filters>
                    <button 
                        type="button"
                        className={`
                        tag-filter 
                        tag-filter-recurrent
                        ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
                        onClick={() => handleFrequencyClick('recorrente')}
                    >
                        Recorrentes
                    </button>

                    <button 
                        type="button"
                        className={`
                        tag-filter 
                        tag-filter-eventual
                        ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
                        onClick={() => handleFrequencyClick('eventual')}
                    >
                        Eventuais
                    </button>
                </Filters>

                <Create>
                    <button 
                        type="button"
                        className={`tag-filter`}
                        onClick={() => /*handleFrequencyClick('eventual')*/ alert('clicou')}
                    >
                        {`Nova ${pageData.title === 'Entradas' ? 'entrada' : 'saída'}`}
                    </button>
                </Create>
            </div>

            <Content>
                {  
                    data.map(item => (
                        <HistoryFinanceCard 
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />
                    ))
                }     
            </Content>            
        </Container>
    );
}

export default List;