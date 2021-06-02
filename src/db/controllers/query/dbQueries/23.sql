with refacciones_vendidas as (
	select refacciones_id, sum(cantidad) as cantidad from orden_piezas group by refacciones_id
),
max_cantidad as (
	select max(cantidad) from refacciones_vendidas
)
select (precio_publico - precio_proveedor) as ganancias, cantidad, proveedor, cantidad_inventario, Nombre, precio_publico, precio_proveedor from refaccion join refacciones_vendidas on refacciones_id=id where cantidad >= any (select * from max_cantidad);