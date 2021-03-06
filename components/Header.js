import Link from 'next/link'
import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import useWindowScrollPosition from '@rehooks/window-scroll-position'
import colors from '../lib/colors'
import AnyImage from './AnyImage'
import HamburgerButton from './HamburgerButton'
import Loading from './Loading'

const scrolledPos = 70

export const CONTENT = gql`
  query {
    content {
      logo
    }
  }
`

const Header = ({ router }) => {
  const [menuState, menuToggle] = React.useState(false)
  let position = {
    y: 0
  }
  if (process.browser && position.y < scrolledPos) {
    position = useWindowScrollPosition({ throttle: scrolledPos })
  }
  const scrolled = position.y > scrolledPos
  return (
    <Query query={CONTENT}>
      {({ loading, error, data }) => {
        if (error) return <h2>Oops</h2>
        if (loading) return <Loading />
        if (data && data.content) {
          const { logo } = data.content
          return (
            <header className={scrolled ? 'header-fade' : ''}>
              <div
                className={
                  scrolled
                    ? 'color-header color-header-scrolled'
                    : 'color-header'
                }
              >
                <div className='triangle-left' />
              </div>
              <div className='burger'>
                <HamburgerButton
                  color={colors.light}
                  open={menuState}
                  action={() => menuToggle(!menuState)}
                  size={25}
                />
              </div>
              <div
                className={
                  menuState
                    ? 'links open'
                    : scrolled
                      ? 'links links-scrolled'
                      : 'links'
                }
              >
                <Link href='/'>
                  <div className={scrolled ? 'logo disappear' : 'logo'}>
                    <AnyImage src={logo} size='35vh' color={'white'} />
                  </div>
                </Link>
                { router &&
                  <div className='menu'>
                    <span className={scrolled ? 'home' : 'home disappear'}>
                      <Link href='/'>
                        <a className={router.pathname === '/' ? 'is-active' : ''}>
                          Início
                        </a>
                      </Link>
                    </span>
                    <Link href='/about'>
                      <a className={router.pathname === '/about' ? 'is-active' : ''}>
                        Quem somos
                      </a>
                    </Link>
                    <Link href='/villages'>
                      <a className={router.pathname === '/villages' ? 'is-active' : ''}>
                        Aldeias
                      </a>
                    </Link>
                    <Link href='/categories'>
                      <a
                        className={router.pathname === '/categories' ? 'is-active' : ''}
                      >
                        Linhas de ação
                      </a>
                    </Link>
                    <Link href='/projects'>
                      <a className={router.pathname === '/projects' ? 'is-active' : ''}>
                        Projetos
                      </a>
                    </Link>
                    <Link href='/project?slug=cooperativa-kayapo-de-produtos-da-floresta-cooba-y'>
                      <a className={(router.pathname === '/project' && router.query.slug === 'cooperativa-kayapo-de-produtos-da-floresta-cooba-y') ? 'is-active' : ''}>
                        Nossos produtos
                      </a>
                    </Link>
                    <Link href='/news'>
                      <a className={router.pathname === '/news' ? 'is-active' : ''}>
                        Notícias
                      </a>
                    </Link>
                    <Link href='/tag?slug=midia-mekaro'>
                      <a className={router.pathname === '/midia' ? 'is-active' : ''}>
                       Mídia Mekarõ
                      </a>
                    </Link>
                  </div>
                }
              </div>
              <style jsx>{`
                header {
                  width: 100%;
                  z-index: 100;
                  top: 0;
                  position: absolute;
                  height: 15vh;
                  padding-top: 5vh;
                  transition: top 0.4s ease;
                  left: 0;
                }
                .header-fade {
                  position: fixed;
                  background: none;
                  border: none;
                  box-shadow: none;
                  /* height: 7vh; */
                  /* height: 11vh; */
                  top: -5vh;
                }
                .color-header {
                  background: ${colors.dark};
                  width: 100%;
                  height: 7vh;
                  position: fixed;
                  right: -110%;
                  transition: right 1.2s ease;
                }
                .triangle-left {
                  width: 3.5vh;
                  height: 0;
                  padding-top: 3.5vh;
                  padding-bottom: 3.5vh;
                  overflow: hidden;
                  position: relative;
                  right: 3.5vh;
                }
                .triangle-left:after {
                  content: '';
                  display: block;
                  width: 0;
                  height: 0;
                  margin-top: -500px;
                  border-top: 500px solid transparent;
                  border-bottom: 500px solid transparent;
                  border-right: 500px solid ${colors.dark};
                }

                a {
                  text-decoration: none;
                  color: white;
                  text-transform: uppercase;
                  font-size: 1.4em;
                  padding: 4px 15px;
                  border-radius: 7px;
                  margin-right: 15px;
                }
                .logo {
                  position: absolute;
                  cursor: pointer;
                  opacity: 1;
                  transition: height 0.2s ease;
                  transition: opacity 0.6s ease;
                }
                .burger {
                  width: 100%;
                  position: fixed;
                  top: 0;
                  background: ${colors.dark};
                  padding: 12px;
                  z-index: 100;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                }
                .links {
                  width: 93%;
                  height: 100vh;
                  position: fixed;
                  left: -300vw;
                  transition: left 0.6s;
                  background: ${colors.dark};
                  display: flex;
                  flex-flow: column;
                  align-items: center;
                  justify-content: space-around;
                  z-index: 99;
                }
                .home {
                  opacity: 1;
                  transition: all 0.8s ease;
                }
                .is-active,
                a:hover {
                  background: ${colors.color1};
                }
                .open {
                  left: 0;
                }
                @media screen and (max-width: 967px) {
                  .logo {
                    // padding-top: 18vh;
                    top: 30px;
                  }
                  .menu {
                    display: flex;
                    flex-flow: column;
                    align-items: center;
                    justify-content: space-between;
                    height: 50vh;
                  }
                }
                @media screen and (min-width: 968px) {
                  .logo {
                    // display: none;
                  }
                  .disappear {
                    opacity: 0;
                  }
                  header {
                    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.4);
                    background: rgba(0, 0, 0, 0.4);
                    border-radius: 4px;
                    transition: height 0.5s ease;
                  }
                  .links {
                    /* width: 90%; */
                    margin-left: -49%;
                    /* font-size: 30px; */
                    height: 11vh;
                    position: absolute;
                    left: 50%;
                    /* top: 5%; */
                    background: none;
                    justify-content: flex-start;
                    flex-flow: row nowrap;
                    transition: all 0.4s ease;
                  }
                  .color-header-scrolled {
                    right: 0;
                  }
                  .links-scrolled {
                    height: 7vh;
                  }
                  .menu {
                    margin: 25px auto;
                    padding: 25px 0;
                    margin-bottom: 25px;
                    width: 90%;
                    display: flex;
                    flex-flow: row no-wrap;
                    align-items: baseline;
                    justify-content: flex-end;
                    background: none;
                  }
                  .burger {
                    display: none;
                  }
                }

                @media screen and (min-width: 1024px) {
                  .menu {
                    width: 85%;
                  }
                }
                @media screen and (min-width: 1125px) {
                  .logo {
                    display: block;
                  }
                  .links {
                    margin-left: -43%;
                  }
                }
                @media screen and (min-width: 1280px) {
                  .menu {
                    width: 75%;
                  }
                  .links {
                    /* width: 968px; */
                  }
                }
              `}</style>
            </header>
          )
        }
      }}
    </Query>
  )
}

export default withRouter(Header)
