with gasto_automovil as (
	select automovil_numero_serie, sum(precio_ticket(id)) as gasto from ticket join revision on id=ticket_id
		where fecha_inicio
			between cast('{{fecha_inicio}}' as date) 
				and cast('{{fecha_final}}' as date) group by automovil_numero_serie
),
max_gasto as (
	select max(gasto) from gasto_automovil
)
select * from automovil join gasto_automovil on automovil_numero_serie=numero_serie where gasto >= any (select * from max_gasto);