with numero_reparaciones_dpto as (
    select
      dno,
      count(*) as cantidad
    from
      tarea
      join orden_reparacion on id = servicio_requerido_id
    where
      fecha_finalizacoin between cast('{{fecha_inicio}}' as date)
      and cast('{{fecha_final}}' as date)
    group by
      dno
  ),
  max_rep as (
    select
      max(cantidad)
    from
      numero_reparaciones_dpto
  )
select
  dno,
  cantidad
from
  numero_reparaciones_dpto
where
  cantidad in (
    select
      *
    from
      max_rep
  );