import { Route, Routes } from "react-router-dom"
import { ItemsList } from "./itemsList"
import { NewDecorationForm } from "./newDecorationForm"
import { DecorationEditForm } from "./decorationEdit"
import { HalloweenItems } from "./Halloween"
import { ChristmasItems } from "./Christmas"
import { ThanksgivingItems } from "./Thanksgiving"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="items" element={<ItemsList />} />
                <Route path="new" element={<NewDecorationForm />} />
                <Route path=":id" element={<DecorationEditForm />} />
                <Route path="halloween" element={<HalloweenItems />} />
                <Route path="christmas" element={<ChristmasItems />} />
                <Route path="thanksgiving" element={<ThanksgivingItems />} />
        </Routes>
    )
}