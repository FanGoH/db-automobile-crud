with numero_reparaciones_dpto as (
	select dno, count(*) as cantidad
		from tarea join orden_reparacion on id=servicio_requerido_id 
		where fecha_finalizacoin 
			between cast('{{fecha_inicio}}' as date) 
				and cast('{{fecha_final}}' as date) group by dno),
max_rep as (
	select min(cantidad) from numero_reparaciones_dpto
)
select nombre, dno, cantidad from numero_reparaciones_dpto  join departamento on dno=numero where cantidad in (select * from max_rep);
