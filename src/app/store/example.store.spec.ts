import {Actions, NgxsModule, ofActionCompleted, Store} from "@ngxs/store";
import {TestBed} from "@angular/core/testing";
import {ExampleAction, ExampleState, ExampleStateModel} from "./example.store";
import {Subject} from "rxjs";

describe('Example Store', () => {
    let store: Store;
    let actions$: Actions;

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [NgxsModule.forRoot([ExampleState])]});
        store = TestBed.inject(Store);
        actions$ = TestBed.inject(Actions);
    });

    it('should init default', () => {
        expect(store.selectSnapshot(ExampleState)).toBeDefined();
    });

    describe('Strange behavior', () => {
        let testValue: string;

        beforeEach(() => {
            testValue = "Han Solo"
        });

        it('should add "Han Solo" to store state', (done) => {
            // Arrange
            actions$
                .pipe(ofActionCompleted(ExampleAction))
                .subscribe((actionUnderTest) => {
                    // Assert
                    expect(actionUnderTest.result?.successful).toBeTruthy();
                    const resultState: ExampleStateModel = store.selectSnapshot(ExampleState);
                    expect(resultState).toBeTruthy();
                    expect(resultState.whatever).toStrictEqual(testValue);
                    done();
                });
            // Act
            store.dispatch(new ExampleAction(testValue));
        });

        it('should show expectation error', (done) => {
            // Arrange
            actions$
                .pipe(ofActionCompleted(ExampleAction))
                .subscribe((actionUnderTest) => {
                    // Assert
                    console.log('ACTION$ -> i was here! Before');
                    expect(true).toBeFalsy();
                    console.log('ACTION$ -> i was here! After');
                    done();
                });
            // Act
            store.dispatch(new ExampleAction(testValue));
        });

        it('should be like this if it fails', (done) => {
            // Arrange
            const subject$ = new Subject<void>()
            subject$
                .subscribe(() => {
                    // Assert
                    console.log('RXJS Subject -> i was here! Before');
                    expect(true).toBeFalsy();
                    console.log('RXJS Subject -> i was here! After');
                    done();
                });
            // Act
            subject$.next();
        });
    });
});
