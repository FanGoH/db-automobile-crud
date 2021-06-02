with departamento_dno as
	(select numero from departamento 
		where nombre='{{departamento.nombre}}'),
tareas_periodo as
	(select servicio_requerido_id, dno 
		from tarea join orden_reparacion on id=servicio_requerido_id 
		where fecha_finalizacoin 
			between cast('{{fecha_inicio}}' as date) 
				and cast('{{fecha_final}}' as date)),
tareas_departamento as
	(select dno, servicio_requerido_id from tareas_periodo where dno in (select * from departamento_dno)),
costo_servicios as
	(select id, costo from servicio_requerido join tipo_servicio on clave_tipo=clave),
ingresos_tareas as 
	(select dno, costo from tareas_departamento join costo_servicios on id=servicio_requerido_id),
ingresos_piezas as
	(select 4 as dno,sum(cantidad * precio) as ingresos from (select ticket.id from ticket where fecha_inicio between cast('{{fecha_inicio}}' as date) and cast('{{fecha_final}}' as date)) as dd join piezas_ticket on id =ticket_id)
select *  from ((select dno, sum(costo) as ingresos from ingresos_tareas group by dno) union (select dno,ingresos from ingresos_piezas))as dd join departamento on numero
limit 1;
