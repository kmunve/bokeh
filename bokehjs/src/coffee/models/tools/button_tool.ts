import {Class} from "core/class"
import {DOMView} from "core/dom_view"
import {Tool, ToolView} from "./tool"
import {empty} from "core/dom"
import * as p from "core/properties"

export abstract class ButtonToolButtonView extends DOMView {

  model: ButtonTool

  initialize(options: any): void {
    super.initialize(options)
    this.connect(this.model.change, () => this.render())
    this.el.addEventListener("click", (e) => {
      e.stopPropagation()
      e.preventDefault()
      this._clicked()
    })
    this.render()
  }

  render(): void {
    empty(this.el)
    this.el.classList.add(this.model.icon)
    this.el.title = this.model.tooltip
  }

  protected abstract _clicked(): void
}

ButtonToolButtonView.prototype.className = "bk-toolbar-button"

export abstract class ButtonToolView extends ToolView {
  model: ButtonTool
}

export abstract class ButtonTool extends Tool {

  disabled: boolean

  tool_name: string

  icon: string

  button_view: Class<ButtonToolButtonView>

  get tooltip(): string {
    return this.tool_name
  }
}

ButtonTool.prototype.type = "ButtonTool"

ButtonTool.internal({
  disabled: [ p.Boolean, false ]
})
