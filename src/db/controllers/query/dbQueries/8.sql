with num_dep as 
	(select numero from departamento where nombre='{{departamento.nombre}}'),
supervisores as
	(select supervisor as super_dni from empleado where dno in (select * from num_dep))
select super_dni, dni as supervisado from empleado join supervisores on supervisor=super_dni order by super_dni asc;