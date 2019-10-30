export class Documentation {
  public responsive = `<div class="row">
    <div class="col-xs-12
                col-sm-8
                col-md-6
                col-lg-4">
        <div class="box">Responsive</div>
    </div>
</div>`;

  public fluid = `.col-xs-6 {
  flex-basis: 50%;
}`;

  public offset = `<div class="row">
    <div class="col-xs-offset-3 col-xs-9">
        <div class="box">offset</div>
    </div>
</div>`;

  public auto = `<div class="row">
    <div class="col-xs">
        <div class="box">auto</div>
    </div>
</div>`;

  public nested = `<div class="row">
    <div class="col-xs">
        <div class="box">
            <div class="row">
                <div class="col-xs">
                    <div class="box">auto</div>
                </div>
            </div>
        </div>
    </div>
</div>`;

  public start = `<div class="row start-xs">
    <div class="col-xs-6">
        <div class="box">
            start
        </div>
    </div>
</div>

.start-xs {
  justify-content: flex-start;
  text-align: start;
}`;
  public center = `<div class="row center-xs">
    <div class="col-xs-6">
        <div class="box">
            start
        </div>
    </div>
</div>

.center-xs {
  justify-content: center;
  text-align: center;
}`;
  public end = `<div class="row end-xs">
    <div class="col-xs-6">
        <div class="box">
            end
        </div>
    </div>
</div>

.end-xs {
  justify-content: flex-end;
  text-align: end;
}`;
  public top = `<div class="row top-xs">
    <div class="col-xs-6">
        <div class="box">
            top
        </div>
    </div>
</div>

.top-xs {
  align-items: flex-start;
}`;
  public middle = `<div class="row middle-xs">
    <div class="col-xs-6">
        <div class="box">
            center
        </div>
    </div>
</div>

.middle-xs {
  align-items: center;
}`;
  public bottom = `<div class="row bottom-xs">
    <div class="col-xs-6">
        <div class="box">
            bottom
        </div>
    </div>
</div>

.bottom-xs {
  align-items: flex-end;
}`;
  public around = `<div class="row around-xs">
    <div class="col-xs-2">
        <div class="box">
            around
        </div>
    </div>
    <div class="col-xs-2">
        <div class="box">
            around
        </div>
    </div>
    <div class="col-xs-2">
        <div class="box">
            around
        </div>
    </div>
</div>

.around-xs {
  justify-content: space-around;
}`;
  public between = `<div class="row between-xs">
    <div class="col-xs-2">
        <div class="box">
            between
        </div>
    </div>
    <div class="col-xs-2">
        <div class="box">
            between
        </div>
    </div>
    <div class="col-xs-2">
        <div class="box">
            between
        </div>
    </div>
</div>

.between-xs {
  justify-content: space-between;
}`;
  public first = `<div class="row">
    <div class="col-xs-2">
        <div class="box">
            1
        </div>
    </div>
    <div class="col-xs-2">
        <div class="box">
            2
        </div>
    </div>
    <div class="col-xs-2 first-xs">
        <div class="box">
            3
        </div>
    </div>
</div>`;
  public last = `<div class="row">
    <div class="col-xs-2 last-xs">
        <div class="box">
            1
        </div>
    </div>
    <div class="col-xs-2">
        <div class="box">
            2
        </div>
    </div>
    <div class="col-xs-2">
        <div class="box">
            3
        </div>
    </div>
</div>`;
  public reverse = `<div class="row reverse">
    <div class="col-xs-2">
        <div class="box">
            1
        </div>
    </div>
    <div class="col-xs-2">
        <div class="box">
            2
        </div>
    </div>
    <div class="col-xs-2">
        <div class="box">
            3
        </div>
    </div>
</div>`;

  public hidein = `<div class="row">
  <div class="col-xxs-12 col-xs-12 hide-in-xs col-sm-12 col-md-12 col-lg-12">
    <div class="box box-container"></div>
    </div>
  </div>`;

  public hideup = `<div class="row">
  <div class="col-xxs-12 col-xs-12 col-sm-12 col-md-12 hide-up-md col-lg-12">
    <div class="box box-container"></div>
    </div>
  </div>`;

  public hidedown = `<div class="row">
  <div class="col-xxs-12 col-xs-12 col-sm-12 col-md-12 hide-down-md col-lg-12">
    <div class="box box-container"></div>
    </div>
  </div>`;
}
