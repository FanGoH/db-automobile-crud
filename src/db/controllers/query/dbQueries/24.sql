with diagnostico_garantia as (
    select
      clave
    from
      tipo_diagnostico
    where
      nombre = 'Reparacion Garantía'
  ),
  garantias_aplicadas as (
    select
      servicio_requerido.id as id
    from
      servicio_requerido
      join diagnostico on diagnostico_id = diagnostico.id
    where
      diagnostico.clave_tipo in (
        select
          *
        from
          diagnostico_garantia
      )
  )
select
  dno,
  count(*) as cantidad
from
  tarea
  join garantias_aplicadas on id = servicio_requerido_id
group by
  dno
having
  max(cantidad);