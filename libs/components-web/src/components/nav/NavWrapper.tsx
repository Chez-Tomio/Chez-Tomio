/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export class NavWrapper extends React.Component<
    {},
    {
        isOpen: boolean;
        isHamburger: boolean;
    }
> {
    public static Context = React.createContext({
        isHamburger: false,
        isOpen: false,
        setIsOpen: (_: boolean) => {},
    });

    state = {
        isOpen: false,
        isHamburger: false,
    };

    hamburgerMediaQuery?: MediaQueryList;
    hamburgerMediaQueryListener?: (event: MediaQueryListEvent) => void;

    private setIsOpen(newValue: boolean) {
        this.setState(() => ({
            isOpen: newValue,
        }));
    }

    componentDidMount() {
        this.hamburgerMediaQuery = window.matchMedia('(max-width: 1100px)');
        this.setState(() => ({ isHamburger: this.hamburgerMediaQuery?.matches ?? false }));
        this.hamburgerMediaQueryListener = ({ matches }) =>
            this.setState(() => ({
                isHamburger: matches,
            }));
        this.hamburgerMediaQuery.addEventListener('change', this.hamburgerMediaQueryListener);
    }

    componentWillUnmount() {
        if (this.hamburgerMediaQueryListener)
            this.hamburgerMediaQuery?.removeEventListener(
                'change',
                this.hamburgerMediaQueryListener,
            );
    }

    render() {
        return (
            <NavWrapper.Context.Provider
                value={{
                    isHamburger: this.state.isHamburger,
                    isOpen: this.state.isOpen,
                    setIsOpen: (newValue) => this.setIsOpen(newValue),
                }}
            >
                <div
                    css={css`
                        position: absolute;
                        width: 100vw;
                        right: ${this.state.isHamburger && this.state.isOpen ? '500px' : '0px'};
                        transition: right 0.3s;
                        &:after {
                            content: '';
                            background-color: black;
                            opacity: 0.8;
                        }
                    `}
                >
                    {this.props.children}
                </div>
            </NavWrapper.Context.Provider>
        );
    }
}
