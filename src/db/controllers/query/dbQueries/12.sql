set @inicio = cast('{{fecha_inicio}}' as date);
set @final = cast('{{fecha_final}}' as date);
select * from promocion where final >= @inicio and inicio<= @final;
select * from promocion;