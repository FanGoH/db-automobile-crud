with prom as
(select *,count(*) from promocion
	where final 
			between cast('{{fecha_inicio}}' as date) 
					and cast('{{fecha_final}}' as date) group by clave)
select * from prom union (select null,null,null,"Total",null,null, count(*) from prom);