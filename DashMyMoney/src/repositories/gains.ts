import axios, { AxiosResponse } from "axios";

interface Gains {
  id: number;
  description: string;
  amount: string;
  type: string;
  frequency: string;
  date: string;
}

export default async function GetGains(): Promise<Gains[]> {
  let result: Gains[] = [];

  try {
    const response: AxiosResponse<Gains[]> = await axios.get("http://localhost:3333/gains");
    result = response.data;
  } catch (error) {
    console.error(error);
    result = [];
  }

  return result;
}
  