import {Action, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';

// ACTIONS
export class ExampleAction {
    static readonly type: string = '[ExampleStore] ExampleAction';

    constructor(public value: string) {
    }
}


// STORE
export const EXAMPLE_STATE_KEY = 'ExampleStore';

export interface ExampleStateModel {
    whatever?: string
}

@State<ExampleStateModel>({
    name: EXAMPLE_STATE_KEY,
    defaults: {}
})
@Injectable()
export class ExampleState {
    @Action(ExampleAction)
    onExampleAction(
        ctx: StateContext<ExampleStateModel>,
        {value}: ExampleAction
    ): void {
        // reset state to default
        ctx.setState({whatever: value});
    }
}
