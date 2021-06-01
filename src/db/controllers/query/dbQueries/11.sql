with ordenes_piezas_cantidad as
	(select pedido_refaccion_id, sum(cantidad) as total 
		from orden_piezas 
        group by pedido_refaccion_id),
tareas_periodo as
	(select servicio_requerido_id as sr_id, dno 
		from tarea join orden_reparacion on id=servicio_requerido_id 
        where fecha_finalizacoin 
			between cast('{{fecha_inicio}}' as date) 
				and cast('{{fecha_final}}' as date)),
ordenes_departamento as
	(select ANY_VALUE(dno) as dno, sum(total) as numero_total 
		from servicio_requerido join tareas_periodo on sr_id=id join ordenes_piezas_cantidad on refacciones_necesarias_id=pedido_refaccion_id 
        group by dno),
max_dep as
	(select ANY_VALUE(dno) as dno, ANY_VALUE(numero_total) as numero_ordenadas from ordenes_departamento having max(numero_total))
select * from departamento join max_dep on dno=numero;