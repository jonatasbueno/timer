import 'styled-components'

import { defaultTheme } from '../styles/themes/default'

// armazenando o tipo inferido em defaultTheme dentro de um tipo ThemeType
type ThemeType = typeof defaultTheme

/**
 * a linha abaixo significa que uma nova versão de tipagem para a lib styled-components está sendo criada
 * entretando acima importamos o próprio styled-components, com isso temos a sobrescrita apenas dos typos declarados
 */
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
