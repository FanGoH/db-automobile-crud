with clientes_fecha as (
    select
      cliente_dni
    from
      ticket
      join revision on ticket_id = id
    where
      fecha_inicio between cast('{{fecha_inicio}}' as date)
      and cast('{{fecha_final}}' as date)
      and orden_reparacion_id is null
  )
select
  *
from
  cliente
where
  dni in (
    select
      *
    from
      clientes_fecha
  );