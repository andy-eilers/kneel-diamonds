// Generating HTML representation of order state

//Importing functions from databse module
import { getOrders, getMetals, getSizes, getStyles } from "./database.js"

//Declaring variables and assigning value of return value from invoking these functions
const metals = getMetals()
const styles = getStyles()
const sizes = getSizes()

//
const buildOrderListItem = (order) => {
    const foundMetal = metals.find(
        (metal) => {
            return metal.id === order.metalId
        }
    )
    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId
        }
    )
    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )
//Generating final price based on addition of price from the other three variables 
    const totalCost = foundMetal.price + foundSize.price + foundStyle.price

    const costString = totalCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    return `<li>
Order #${order.id} cost ${costString}
</li>`
}
// Generating order module as an HTML representation
export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}

