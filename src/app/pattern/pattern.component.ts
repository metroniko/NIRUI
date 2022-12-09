import {Component, OnInit} from '@angular/core';
import {IPattern} from '../entities/IPattern';
import {HttpClient} from '@angular/common/http';
import {environment} from '../enviroments/environment';
import {ITactic} from '../entities/ITactic';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.css']
})
export class PatternComponent implements OnInit {
  public patternsList: IPattern[];
  public inputValue: string;
  public inputCount: number;
  isHidden = true;
  public tacticList: ITactic[];
  public tacticToSave: ITactic[];
  public patternName: string;
  public sh: {name, bool};
  public commandPrompt: {name, bool};
  public powershell: {name, bool};
  public bash: {name, bool};
  public componentP: {name, bool};
  public componentI: {name, bool};
  public componentU: {name, bool};

  constructor(private http: HttpClient, private router: Router) {
    this.http = http;
    this.loadPatternsList();
    this.tacticToSave = [];
    this.router = router;
    this.sh = {
      name: 'sh',
      bool: false
    };
    this.commandPrompt = {
      name: 'command_prompt',
      bool: false
    };
    this.powershell = {
      name: 'powershell',
      bool: false
    };
    this.bash = {
      name: 'bash',
      bool: false
    };
    this.componentP = {
      name: 'SDN_P',
      bool: false
    };
    this.componentU = {
      name: 'SDN_U',
      bool: false
    };
    this.componentI = {
      name: 'SND_I',
      bool: false
    };
  }

  ngOnInit(): void {
  }

  private loadPatternsList() {
    this.http.get(environment.devUrl + `/pattern/all`).subscribe((patterns: IPattern[]) => {
      this.patternsList = patterns;
    });
  }

  searchTactics() {
    this.isHidden = false;
    console.log(this.inputValue);
    const array = [];
    array.push(this.sh, this.bash, this.commandPrompt, this.powershell);
    const anies = array.filter(el => el.bool === true).map(el => el.name);
    console.log(anies);
    this.http.post(environment.devUrl + `/tactic/search/${this.inputValue}`, anies).subscribe((res: ITactic[]) => {
      this.isHidden = true;
      this.tacticList = res;
      console.log(this.sh);
    });
  }

  addToPattern(tactic: ITactic) {
    this.tacticToSave.push(tactic);
    console.log(this.tacticToSave);

  }

  createPattern() {
    const map = {};
    this.tacticToSave.forEach(el => map[el.tacticId] = el.tacticCount);
    const pattern: IPattern = {
      tacticNames: map,
      patternName: this.patternName
    };
    console.log(pattern);
    this.http.post(environment.devUrl + '/pattern/create', pattern).subscribe(res => {
      this.router.navigate(['/']);
    });
  }

  onChangeSH() {
    this.sh.bool = !this.sh.bool;
  }
  onChangeCP() {
    this.commandPrompt.bool = !this.commandPrompt.bool;
  }
  onChangePS() {
    this.powershell.bool = !this.powershell.bool;
  }
  onChangeBash() {
    this.bash.bool = !this.bash.bool;
  }
  onChangeSDNP() {
    this.commandPrompt.bool = !this.commandPrompt.bool;
  }
  onChangeSDNU() {
    this.powershell.bool = !this.powershell.bool;
  }
  onChangeSDNI() {
    this.bash.bool = !this.bash.bool;
  }

  setToCountOfAttack(count: Event, tactic: ITactic) {
    tactic.tacticCount = count.target.value;
    console.log(tactic.tacticName);
    console.log(tactic.tacticCount);
  }
}
