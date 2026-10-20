import time
import multiprocessing
import os
import sys # Importar sys para el manejo de argumentos si se desea automatizar más

#----------------------------------------------------------------------------
# FUNCIÓN DE CÁLCULO INTENSIVO (Carga de Trabajo)
#----------------------------------------------------------------------------
def calculo(n):
    """Función intensiva en CPU para simular la carga de trabajo."""
    res = 0
    # Este bucle define la intensidad de la carga de trabajo de una sola repetición
    for i in range(20000000):
        res = res + ((i % 5) * (i % 7))
    return res

if __name__ == "__main__":
    
    # =========================================================================
    # 📌 CONFIGURACIÓN DE PARÁMETROS (MODIFICAR AQUÍ PARA LA PRÁCTICA)
    # =========================================================================
    # Parámetro 1: Carga de Trabajo (Repeticiones) - Valores a probar: 10, 20, 40
    rep = 10 
    
    # Parámetro 2: Procesadores Utilizados (cantidad_cpu) - Valores a probar: 1, 2, os.cpu_count()
    # ATENCIÓN: Modificar este valor para cada prueba según la tabla.
    cantidad_cpu = 12 
    # =========================================================================
    
    # Consulta el número máximo de núcleos lógicos disponibles
    n_cpu = os.cpu_count()
    print("La cantidad MÁXIMA de CPU asignada es:", n_cpu)
    print(f"*** Parámetros Actuales: Repeticiones={rep}, CPUs utilizadas={cantidad_cpu} ***\n")


    #----------------------------------------------------------------------------
    # INICIAMOS PROCESAMIENTO SECUENCIAL (Necesario para el cálculo de Speedup)
    #----------------------------------------------------------------------------
    print("--- INICIO PROCESAMIENTO SECUENCIAL ---")
    inicio_tps = time.time()
    
    for i in range(rep):
        calculo(i)
        
    fin_tps = time.time()
    tiempo_ps = round(fin_tps - inicio_tps, 4)
    print(f"El tiempo SECUENCIAL (Tps) es: {tiempo_ps} segundos.")
    

    #----------------------------------------------------------------------------
    # INICAMOS PROCESAMIENTO PARALELO
    #----------------------------------------------------------------------------
    print("\n--- INICIO PROCESAMIENTO PARALELO ---")
    
    # Aseguramos que la cantidad de CPU no exceda el máximo
    if cantidad_cpu > n_cpu:
        print(f"ADVERTENCIA: Se solicitó {cantidad_cpu} CPUs, pero solo hay {n_cpu} disponibles. Usando el máximo.")
        cantidad_cpu = n_cpu
        
    inicio_tpp = time.time()
    
    # Utiliza el Pool con la cantidad_cpu definida
    with multiprocessing.Pool(processes=cantidad_cpu) as pool:
        # map() distribuye las 'rep' llamadas a la función calculo(i) entre las CPUs
        pool.map(calculo, range(rep))
        
    fin_tpp = time.time()
    
    tiempo_pp = round(fin_tpp - inicio_tpp, 4)
    print(f"El tiempo PARALELO (Tpp) es: {tiempo_pp} segundos.")


    #----------------------------------------------------------------------------
    # CALCULO Y VISUALIZACIÓN DE PARÁMETROS (MÉTRICAS CLAVE)
    #----------------------------------------------------------------------------

    # Aceleración (Speedup): S = Tps / Tpp
    speedup = tiempo_ps / tiempo_pp
    
    # Eficiencia: E = (S / p) * 100 donde p es cantidad_cpu
    eficiencia = (speedup / cantidad_cpu) * 100
    
    # Mejora (Mejora): % de reducción de tiempo
    mejora = ((tiempo_ps - tiempo_pp) / tiempo_ps) * 100
    
    print("\n******** RESULTADOS CLAVE PARA EL INFORME *********")
    print(f"Tiempo Procesamiento Secuencial (Tps): {tiempo_ps} s")
    print(f"Tiempo Procesamiento Paralelo (Tpp): {tiempo_pp} s")
    print(f"Procesadores utilizados (p): {cantidad_cpu}")
    print("-------------------------------------------------")
    print(f"Parametro Speedup (S): {round(speedup, 4)}")
    print(f"Parametro Eficiencia (E): {round(eficiencia, 4)} %")
    print(f"Parametro Mejora: {round(mejora, 4)} %")
    print("*************************************************")