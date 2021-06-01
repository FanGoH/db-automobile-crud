with servicios_entre as
	(select servicio_requerido_id 
		from tarea join orden_reparacion on id=orden_reparacion_id 
        where fecha_inicio 
			between cast('{{fecha_inicio}}' as date) 
				and cast('{{fecha_final}}' as date)),
promociones_usadas as
	(select distinct clave_promocion, dno 
		from servicio_requerido join tarea on id=servicio_requerido_id 
        where id in (select * from servicios_entre) 
            and clave_promocion is not null),
dno_mecanico as
	(select numero from departamento where nombre='mecanico'),
promociones_mecanico as
	(select distinct clave_promocion 
		from promociones_usadas 
        where dno in (select * from dno_mecanico))
select * from promocion 
	where clave in (select * from promociones_mecanico);