with gasto_clientes as (
	select cliente_dni, sum(precio_ticket(id)) as gasto from ticket join revision on id=ticket_id group by cliente_dni
),
max_gasto as (
	select max(gasto) from gasto_clientes
)
select * from cliente join gasto_clientes on cliente_dni=dni where gasto >= any (select * from max_gasto);
