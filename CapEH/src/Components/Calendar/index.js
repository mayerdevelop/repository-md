import api from '../../Services/api';


export default async function loadCalendar(){
    const response = await api.get('/calendar/all');
    console.log(JSON.stringify(response.data))
  return response.data

}