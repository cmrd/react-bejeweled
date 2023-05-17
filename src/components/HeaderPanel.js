import HeaderPanelStyles from "./css_modules/HeaderPanelStyles.module.css"

const HeaderPanel = ({ children }) => {

    return (
        <div className={HeaderPanelStyles.headerPanel}>
            {children}
        </div>
    )

}

export default HeaderPanel