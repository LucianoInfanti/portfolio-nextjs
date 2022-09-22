const { Client } = require('pg')

async function main() {
    // Colocar os dados certos aqui!!
    // Vc vai encontrar eles em:
    // Settings (painel lateral esquerdo) -> Database -> Connection info
    const client = new Client({
        host: "",
        port: 0,
        user: "",
        password: ""
    })
    await client.connect()

    // Primeiro checamos se já existe alguma linha na tabela
    let res = await client.query('SELECT * from "Counter"')
    console.log(JSON.stringify(res.rows, null, 2))

    // Se realmente não existir nenhuma linha, criamos uma nova
    if (!res.rows.length) {
        await client.query('INSERT INTO "Counter" VALUES (default, 0, now())')

        // Agora já deve existir uma linha
        res = await client.query('SELECT * from "Counter"')
        console.log(JSON.stringify(res.rows, null, 2))
    }

    // Aqui a gente pode assumir que res.rows possui pelo menos uma linha
    // O formato do objeto res.rows é assim:
    // [
    //     {
    //         "id": "1",
    //         "count": 0,
    //         "created_at": "2022-09-22T15:39:43.000Z"
    //     }
    // ]
    // Então acessamos o "count" dessa linha assim:
    const currentCount = res.rows[0].count
    const nextCount = currentCount + 1
    const rowId = res.rows[0].id

    // Agora atualizamos o valor na tabela
    // O $1 marca a posição do primeiro argumento, o $2 do segundo argumento
    // Daí passamos os argumentos na ordem correta pra esse array abaixo
    await client.query('UPDATE "Counter" SET count=$1 WHERE id=$2', [nextCount, rowId])

    // Agora o valor deve estar atualizado
    // Se vc tiver mais de uma linha na tabela, pode ser que vc não pegue sempre a mesma linha
    // ali em cima no "const rowId=...", pq as linhas podem vir fora de ordem na consulta do bd
    // Fica como exercício para o leitor fixar o id caso queira kajshfsdkjlfjsdf
    res = await client.query('SELECT * from "Counter"')
    console.log(JSON.stringify(res.rows, null, 2))

    await client.end()

    // Agora a gente retorna o count atualizado
    return res.rows[0].count
}

main().then((r) => console.log(r)).catch(console.error)