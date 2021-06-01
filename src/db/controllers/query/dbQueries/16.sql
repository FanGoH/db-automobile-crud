with orden_refacciones_dpto as (
    select
      dno,
      refacciones_necesarias_id
    from
      tarea
      join servicio_requerido on servicio_requerido_id = id
  ),
  refacciones_ordenes as (
    select
      dno,
      cantidad
    from
      orden_refacciones_dpto
      join orden_piezas on pedido_refaccion_id = refacciones_necesarias_id
  )
select
  dno,
  count(cantidad) as cantidad_refacciones
from
  refacciones_ordenes
group by
  dno
order by
  cantidad_refacciones asc;