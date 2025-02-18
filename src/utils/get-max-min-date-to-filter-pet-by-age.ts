import dayjs from 'dayjs';

export function getMaxMinDateToAge(age:number){

	const today = dayjs();
  
	// Data mínima (idade + 1 ano, ou seja, o pet pode ter 2 anos completos ou até 3 incompletos)
	const minDate = today.subtract(age + 1, 'year')
		.add(1, 'day');
      
	// Data máxima (2 anos exatos)
	const maxDate = today.subtract(age, 'year');

	return {
		maxDate,
		minDate
	};
}