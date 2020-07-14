import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LabeledAddressComponent } from './labeled-address.component'

describe('LabeledAddressComponent', () => {
  let component: LabeledAddressComponent
  let fixture: ComponentFixture<LabeledAddressComponent>

  beforeEach(async(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    TestBed.configureTestingModule({
      declarations: [LabeledAddressComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeledAddressComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
