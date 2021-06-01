with atenciones_periodo as
	(select dno, fecha_finalizacoin 
		from tarea join orden_reparacion on servicio_requerido_id=id 
        where fecha_finalizacoin 
			between cast('{{fecha_inicio}}' as date) 
				and cast('{{fecha_final}}' as date))
select nombre, dno, count(fecha_finalizacoin) as cantidad 
	from atenciones_periodo join departamento on numero=dno 
    group by dno;