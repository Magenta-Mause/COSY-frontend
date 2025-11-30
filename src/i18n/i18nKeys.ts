export type i18nLanguage = {
  index: {
    clickCounter: string;
    clickBtn: string;
    dontClickBtn: string;
  };

  redirected: {
    warning: string;
    consequence: ContainsVariable<"counter">;
    noConsequence: string;
    earnMoreClicks: string;
  };

  components: {
    CreateGameServer: {
      openButton: string;
      backButton: string;
      nextStepButton: string;
      createServerButton: string;
      steps: {
        step1: {
          title: string;
          gameSelection: {
            title: string;
            description: string;
          };
        };
        step2: {
          title: string;
          description: string;
          templateSelection: {
            title: string;
            description: string;
          };
          serverNameSelection: {
            title: string;
            description: string;
          };
        };
        step3: {
          title: string;
          description: string;
          dockerImageSelection: {
            title: string;
            description: string;
          };
          imageTagSelection: {
            title: string;
            description: string;
          };
          portSelection: {
            title: string;
            description: string;
          };
          environmentVariablesSelection: {
            title: string;
            description: string;
          };
          executionCommandSelection: {
            title: string;
            description: string;
          };
          hostPathSelection: {
            title: string;
            description: string;
          };
        };
      };
    };
  };
};

type ContainsVariable<T extends string> = `${string}{{${T}}}${string}`;
