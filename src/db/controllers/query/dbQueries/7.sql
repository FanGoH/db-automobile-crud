with tareas_empleados as
	(select encargado, servicio_requerido_id 
		from tarea join orden_reparacion on servicio_requerido_id=id
		where fecha_finalizacoin 
			between cast('{{fecha_inicio}}' as date) 
				and cast('{{fecha_final}}' as date)),
servicios_realizados as
	(select encargado, clave_tipo 
		from tareas_empleados join servicio_requerido on id=servicio_requerido_id),
ingresos_empleados as
	(select ANY_VALUE(encargado) as encargado, sum(costo) as ganancias 
		from servicios_realizados join tipo_servicio on clave_tipo=clave 
        group by encargado),
empleado_ganancias as
	(select ANY_VALUE(encargado) as encargado, ANY_VALUE(ganancias) as ganancias 
		from ingresos_empleados),
max_ganancias as
	(select max(ganancias) as m from empleado_ganancias)
select * from empleado join empleado_ganancias on encargado=dni and ganancias=(select m from max_ganancias);