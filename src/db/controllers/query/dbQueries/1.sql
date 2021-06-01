with cliente_reparaciones as 
	(select * from
		(select cliente_dni, count(*) as v 
			from orden_reparacion join revision on id=orden_reparacion_id 
			where fecha_inicio 
				between cast('{{fecha_inicio}}' as date) 
					and cast('{{fecha_final}}' as date)
			group by cliente_dni) 
	as coso),
max_reparaciones as 
	(select max(v) as m from cliente_reparaciones),
clientes_max_reparaciones as
	(select * from cliente_reparaciones where v in (select m from max_reparaciones))
select * from clientes_max_reparaciones;