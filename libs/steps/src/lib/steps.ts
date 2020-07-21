export enum StepStatus {
  WAIT = 'wait',
  TIMEOUT = 'wait',
  FAILED = 'error',
  ONGOING = 'process',
  FINISHED = 'finish',
}

export enum StepsStatus {
  ONGOING = 'process',
  FAILED = 'error',
  FINISHED = 'finish',
  WAIT = 'wait',
}

export class Step {
  index?: number;
  title: string;
  type: string;
  description: string;
  status?: StepStatus;
}

export class Steps {
  steps: Step[];
  errorInfo: string;

  get status(): StepsStatus {
    let nOngoing = 0;
    let nFailed = 0;
    let nFinished = 0;
    for (const step of this.steps) {
      if (step.status === StepStatus.ONGOING) {
        nOngoing++;
        break;
      } else if (step.status === StepStatus.FAILED) {
        nFailed++;
        break;
      } else if (step.status === StepStatus.FINISHED) {
        nFinished++;
      }
    }

    if (nOngoing === 1) {
      return StepsStatus.ONGOING;
    } else if (nFailed === 1) {
      return StepsStatus.FAILED;
    } else if (nFinished === this.steps.length) {
      return StepsStatus.FINISHED;
    } else {
      return StepsStatus.WAIT;
    }
  }

  constructor(steps: Step[]) {
    for (let i = 0; i < steps.length; i++) {
      steps[i].index = i;
      steps[i].status = StepStatus.WAIT;
    }
    this.steps = steps;
  }

  start() {
    this.steps[0].status = StepStatus.ONGOING;
  }

  finish() {
    for (let i = 0; i < this.steps.length; i++) {
      this.steps[i].status = StepStatus.FINISHED;
    }
  }

  setStatusForSingleStep(type: string, status: StepStatus) {
    const current = this.getStep(type);

    if (!current) {
      throw new Error(`Can find the step for "${type}"`);
    }

    current.status = status;
    if (status === StepStatus.FAILED) {
      for (let i = current.index + 1; i < this.steps.length; i++) {
        this.steps[i].status = StepStatus.TIMEOUT;
      }
    } else if (status === StepStatus.FINISHED && !this.isLastStep(current)) {
      this.steps[current.index + 1].status = StepStatus.ONGOING;
    }
  }

  private isLastStep(step: Step): boolean {
    return step.index === this.steps.length - 1;
  }

  private getStep(type: string): Step {
    return this.steps.find((step) => step.type === type);
  }
}
