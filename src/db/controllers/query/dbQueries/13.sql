with garantia_clave as (
	select clave from tipo_diagnostico where clave='6SEVB'
),
diagnosticos_garantia as (
	select * from diagnostico where clave_tipo in (select * from garantia_clave)
),
garantias_fechas as (
	select diagnostico_id from 
		orden_reparacion join revision on orden_reparacion.id=orden_reparacion_id join diagnosticos_garantia on diagnostico_id = diagnosticos_garantia.id
        where fecha_finalizacoin 
			between cast('{{fecha_inicio}}' as date) 
				and cast('{{fecha_final}}' as date)
),
costos as (
	select ticket_id,precio_ticket(ticket_id) as costo from garantias_fechas natural join revision 
)
select * from costos;
