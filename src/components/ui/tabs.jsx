import { Users, Calendar, DollarSign, Plus, TrendingUp, Church } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'; 




const NavTabs = ({ value, onValueChange }) => {
    const { isDark } = useTheme(); 

    const tabs = [
        { id: "dashboard", label: "Dashboard", icon: <TrendingUp className="h-4 w-4 mr-2" /> },
        { id: "members", label: "Members", icon: <Users className="h-4 w-4 mr-2" /> },
        { id: "finance", label: "Finance", icon: <DollarSign className="h-4 w-4 mr-2" /> },
        { id: "events", label: "Events", icon: <Calendar className="h-4 w-4 mr-2" /> }
    ]

    return (
        <div>
            <ul className={`flex mx-auto justify-center space-x-10 cursor-pointer bg-slate-200 max-w-xl p-1 font-semibold mb-10`}>
                 {tabs.map((tab) => (

                     <li 
                        key={tab.id}
                        onClick={() => onValueChange(tab.id)}
                        className={`py-1 px-4 rounded-md text-sm inline-flex ${value === tab.id ? 'bg-white ' : 'text-slate-400'} ${isDark ? 'text-green-500' : 'text-black'}`}
                     >
                        {tab.icon}
                         {tab.label}
                     </li>
                ))}
            </ul>
        </div>

    )
}

export default NavTabs;