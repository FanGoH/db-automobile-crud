with num_dep as 
	(select numero from departamento where nombre='{{departamento.nombre}}'),
tarea_departamento as
	(select tarea where dno in (select * from num_dep)),
requeridos_departamento as
	(select dno, clave_tipo 
		from tarea join servicio_requerido on id=servicio_requerido_id)
select dno, clave_tipo, count(*) as cantidad 
	from requeridos_departamento 
    where dno=(select numero from num_dep)
    group by dno, clave_tipo 
    order by cantidad desc;