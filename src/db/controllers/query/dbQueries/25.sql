with tickets_rango as (
	select * from ticket where fecha_inicio 
        between cast('{{fecha_inicio}}' as date) 
				and cast('{{fecha_final}}' as date)
),
clientes_visitas as (
	select cliente_dni, max(fecha_inicio) as ultima_visita from tickets_rango, revision where ticket_id=id group by cliente_dni
),
ultima_visita_fecha as (
	select min(ultima_visita) as fecha from clientes_visitas join cliente on cliente_dni=dni
)
select * from clientes_visitas join cliente on dni=cliente_dni where ultima_visita <= (select * from ultima_visita_fecha);
