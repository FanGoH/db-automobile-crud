with info_diagnosticos as
	(select precio from diagnostico join tipo_diagnostico on clave_tipo=clave join revision on id = revision.diagnostico_id where orden_reparacion_id is null )
select count(precio) as cantidad_diagnosticos, sum(precio) as ingresos from info_diagnosticos;