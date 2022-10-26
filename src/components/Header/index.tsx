import { NavLink } from 'react-router-dom'
import { Timer, Scroll } from 'phosphor-react'

import { HeaderContainer } from './styles'

import logoIgnite from '../../assets/logo-ignite.svg'

export const Header = () => (
  <HeaderContainer>
    <img src={logoIgnite} alt="" />
    <nav>
      <NavLink to="/timer" title="Timer" end>
        <Timer size={24} />
      </NavLink>
      <NavLink to="/history" title="Historico">
        <Scroll size={24} />
      </NavLink>
    </nav>
  </HeaderContainer>
)
